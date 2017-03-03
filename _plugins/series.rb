=begin
This module allows you to define a series of posts. Enabling this for a
post allows you to easily get the related posts so that you can show the
user "previous" and "next" links, a table of contents, etc.
To enable this for a post, add the following in the posts YAML front
matter. The name attribute is an arbitrary string to group posts into a
series. The index attribute describes where the current post lives in
relation to its siblings.
series: 
  name:  The Name of the Series
  index: 1
=end

module Jekyll

   class Post
   
      attr_accessor :series
      
      def name
        self.data['title']
      end

      alias series_initialize initialize
      def initialize(site, source, dir, name)      
        series_initialize site, source, dir, name
        self.series = { :name => self.data['series']['name'], :index => self.data['series']['index'].to_i } if self.data['series']
      end

      alias series_to_liquid to_liquid
      def to_liquid
        if self.series
          series_to_liquid.deep_merge({ "siblings" => self.siblings, "next" => self.next })
        else
          series_to_liquid
        end
      end

      alias series_next next
      def next
      
        if self.series
          posts = self.siblings.select { |p| p.series[:index] > self.series[:index] }
          return posts.first
        else
          series_next
        end

      end
      
      alias series_previous previous
      def previous

        if self.data['series']
          posts = self.siblings.select { |p| p.series[:index] < self.series[:index] }
          return posts.last
        else
          series_previous
        end

      end

      def siblings
        posts = self.site.posts.select { |p| p.series && p.series[:name] == self.series[:name] }
        posts.sort_by { |p| p.series[:index] }
      end

   end
 
end
